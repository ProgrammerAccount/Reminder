import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ToDoComponent } from './to-do/to-do.component';
import { BodyComponent } from './body/body.component';
import { GoalsComponent } from './goals/goals.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RutineComponent } from './rutine/rutine.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { TimeLogerComponent } from './time-loger/time-loger.component';
import { APP_BASE_HREF } from '@angular/common';
const appRoutes: Routes = [
  {path : 'todo', component : ToDoComponent},
  {path : 'rutine', component : RutineComponent},
  {path : 'timer', component : TimeLogerComponent},
  {path : 'goals', component : GoalsComponent},
  {path : 'body', component : BodyComponent},
  {path : '', redirectTo: '/todo', pathMatch: 'full'},


];
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ToDoComponent,
        BodyComponent,
        GoalsComponent,
        NavbarComponent,
        RutineComponent,
        TimeLogerComponent

      ],
      imports: [
        FormsModule,
        BrowserModule,
        RouterModule.forRoot(appRoutes, { enableTracing: true })

       ],
       providers: [
        { provide: APP_BASE_HREF, useValue : '/' }
      ],

    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
