import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcessComponent } from 'src/pages/process/process.component';

const routes: Routes = [
  { path: '', component: ProcessComponent },
  { path: 'process', component: ProcessComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
