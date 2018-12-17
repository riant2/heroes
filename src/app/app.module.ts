import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { CallbackComponent } from './callback/callback.component';
import { ConsoleLogPipe } from './console-log.pipe';
import { HeroDetailComponent } from './hero/hero-detail/hero-detail.component';
import { HeroListComponent } from './hero/hero-list/hero-list.component';
import { HeroList2Component } from './hero/hero-list2/hero-list2.component';
import { heroReducer } from './hero/hero.reducer';
import { HeroService } from './hero/hero.service';
import { IterateObjectKeysPipe } from './iterate-object-keys.pipe';
import { IterateObjectValuesPipe } from './iterate-object-values.pipe';
import { IterateObjectPipe } from './iterate-object.pipe';
import { localStorageMetaReducer } from './local-storage.meta-reducer';
import { stateLoggerMetaReducer } from './state-logger.meta-reducer';
import { TableComponent } from './table/table.component';
import { TableRowComponent } from './table/table-row/table-row.component';

const appRoutes: Routes = [
  { path: 'heroes/:id', component: HeroDetailComponent },
  {
    path: 'heroes',
    component: HeroList2Component,
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
    ConsoleLogPipe,
    HeroList2Component,
    TableComponent,
    TableRowComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
  providers: [HeroService],
  bootstrap: [AppComponent],
})
export class AppModule {}
