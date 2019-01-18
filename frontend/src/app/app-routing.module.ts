import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './_shared/auth.guard';

const routes: Routes = [
  {
    path: 'myquiz',
    loadChildren: './myquiz/quiz.module#QuizModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: './questions/questions.module#QuestionsModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'quiz',
    loadChildren: './quiz/quiz.module#QuizModule',
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: AppComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
    {
      // enableTracing: true,
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
