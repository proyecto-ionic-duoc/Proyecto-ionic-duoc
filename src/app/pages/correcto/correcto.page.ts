import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router'; 
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CorrectoPage implements OnInit {
  contrasena: string = '';

  constructor(private router: Router,private route: ActivatedRoute) { 
    const passParam = this.route.snapshot.queryParamMap.get('pass');
    if (passParam !== null) {
      this.contrasena = passParam;
    }
  }

  ngOnInit() {

  }
  login() {
    this.router.navigate(['ingreso']);
  }
}
