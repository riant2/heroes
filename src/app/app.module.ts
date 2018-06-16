import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeroDetailComponent } from './hero/hero-detail/hero-detail.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { heroReducer } from './hero/hero.reducer';
import { HeroListComponent } from './hero/hero-list/hero-list.component';
import { HeroService } from './hero/hero.service';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, HeroDetailComponent, HeroListComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({
      hero: heroReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25 // Retains last 25 states
    })
  ],
  providers: [HeroService],
  bootstrap: [AppComponent]
})
export class AppModule {}
