import { FirestoreService } from "./../firestore.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { NotificationsService } from "angular2-notifications";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  loginForm = new FormGroup({
    Correo: new FormControl("", Validators.required),
    Contraseña: new FormControl(""),
  });

  constructor(
    private authSvc: FirestoreService,
    private router: Router,
    private notificationService: NotificationsService
  ) {}

  ngOnInit(): void {}

  async onLogin() {
    const { Correo, Contraseña } = this.loginForm.value;
    //console.log(this.loginForm.value);
    try {
      const user = await this.authSvc.login(Correo, Contraseña);
      //console.log(user)
      if (Correo === "admin@hotmail.com" && user) {
        this.router.navigate(["/home"]);
      } else if (user) {
        //redirect to homepage
        this.router.navigate(["/home"]);
      } else if (Correo == "" || Contraseña == "") {
        this.onError("Por favor llena todo los campos >:( ");
      } else {
        this.onError("Cuenta no encontrada :( ");
      }
    } catch (error) {
      console.log(error);
    }
    this.authSvc.login(Correo, Contraseña);
    //console.log("Form->", this.loginForm.value);
  }

  Restablecer(correo: string) {
    if (!this.loginForm.invalid) {
      console.log(correo);
      this.authSvc.afAuth
        .sendPasswordResetEmail(correo)
        .then(function () {
          console.log("email enviado a" + correo);
          //email enviado
        })
        .catch(function (error) {});
    } else {
      this.onError("Llena el campo de correo por favor");
    }
  }

  onError(message) {
    this.notificationService.error("Error", message, {
      position: ["bottom", "right"],
      timeOut: 3500,
      animate: "fade",
      showProgressBar: true,
    });
  }
}
