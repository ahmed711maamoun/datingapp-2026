import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Nav } from '../layout/nav/nav'; 

@NgModule({
  declarations: [
    AppComponent,
    Nav
  ],
 
  bootstrap: [AppComponent]
  
})
export class AppModule { }