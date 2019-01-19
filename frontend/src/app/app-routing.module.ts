import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { AppComponent } from "./app.component";
import { AuthComponent } from "./auth/auth.component";

const routes: Routes = [
  {
    path: "myquiz",
    loadChildren: "./myquiz/quiz.module#QuizModule"
  },
  {
    path: "admin",
    loadChildren: "./questions/questions.module#QuestionsModule"
  },
  {
    path: "quiz",
    loadChildren: "./quiz/quiz.module#QuizModule"
  },
  {
    path: "login",
    loadChildren: "./auth/auth.module#AuthModule"
  },
  {
    path: "",
    component: AppComponent,
    pathMatch: "full"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // enableTracing: true,
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
