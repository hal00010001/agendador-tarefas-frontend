import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { RouterState } from '../../../../core/router/router-state';

@Component({
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, RouterLink],
  selector: 'app-top-menu',
  styleUrl: './top-menu.scss',
  templateUrl: './top-menu.html',
})

export class TopMenu implements OnInit, OnDestroy {
  appLogo = 'assets/logo-agendador-javanauta.png';
  currentRoute: string = '';
  subscriptionRoute!: Subscription;

  // constructor(private router: Router) {}

  private routerService = inject(RouterState);

  ngOnInit(): void {
      // this.currentRoute = this.router.url;
      // this.subscriptionRoute = this.router.events
      // .pipe(filter(event => event instanceof NavigationEnd))
      // .subscribe((evento: NavigationEnd) => {
      //   this.currentRoute = evento.url;
      //   console.log("currentRoute: ", this.currentRoute);
        
      // })
      this.subscriptionRoute = this.routerService.rotaAtual$.subscribe(url => {
        this.currentRoute = url;        
      })
  }

  ngOnDestroy(): void {
    // if (this.subscriptionRoute) {
    //   this.subscriptionRoute.unsubscribe();
    // }
    this.subscriptionRoute.unsubscribe();
  }

  onRouteRegister(): boolean {
    return this.currentRoute === '/register';
  }

}
