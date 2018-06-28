import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { CallbackComponent } from './callback/callback.component';
import { HeroDetailComponent } from './hero/hero-detail/hero-detail.component';
import { HeroListComponent } from './hero/hero-list/hero-list.component';
import { heroReducer } from './hero/hero.reducer';
import { HeroService } from './hero/hero.service';
import { IterateObjectKeysPipe } from './iterate-object-keys.pipe';
import { IterateObjectValuesPipe } from './iterate-object-values.pipe';
import { IterateObjectPipe } from './iterate-object.pipe';
import { localStorageMetaReducer } from './local-storage.meta-reducer';
import { stateLoggerMetaReducer } from './state-logger.meta-reducer';

const appRoutes: Routes = [
  { path: 'heroes/:id', component: HeroDetailComponent },
  {
    path: 'heroes',
    component: HeroListComponent,
    data: { title: 'Heroes List' },
  },
  {
    path: '',
    redirectTo: '/heroes',
    pathMatch: 'full',
  },
  {
    path: 'callback',
    component: CallbackComponent,
  },
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroListComponent,
    IterateObjectPipe,
    IterateObjectValuesPipe,
    IterateObjectKeysPipe,
    CallbackComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    StoreModule.forRoot(
      {
        hero: heroReducer,
      },
      {
        metaReducers: [localStorageMetaReducer, stateLoggerMetaReducer],
      },
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
  ],
  providers: [HeroService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
