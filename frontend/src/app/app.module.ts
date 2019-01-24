import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { QuestionsService } from "./_shared/questions.service";
import { AppRoutingModule } from "./app-routing.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from "./app.component";
import { RootComponent } from "./root/root.component";
import {MaterialModule} from './material';

@NgModule({
  declarations: [AppComponent, RootComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [QuestionsService],
  bootstrap: [RootComponent]
})
export class AppModule {}
