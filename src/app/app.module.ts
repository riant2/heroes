import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { HeroDetailComponent } from './hero/hero-detail/hero-detail.component';
import { HeroListComponent } from './hero/hero-list/hero-list.component';
import { heroReducer } from './hero/hero.reducer';
import { HeroService } from './hero/hero.service';

@NgModule({
  declarations: [AppComponent, HeroDetailComponent, HeroListComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({
      hero: heroReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
  ],
  providers: [HeroService],
  bootstrap: [AppComponent],
})
export class AppModule {}
