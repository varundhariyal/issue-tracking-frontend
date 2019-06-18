import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundViewComponent } from './not-found-view/not-found-view.component';
import { ServerErrorViewComponent } from './server-error-view/server-error-view.component';

@NgModule({
  declarations: [NotFoundViewComponent, ServerErrorViewComponent],
  imports: [
    CommonModule
  ]
})
export class ErrorHandlerModule { }
