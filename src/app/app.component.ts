import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'custom-eslint-rule-example';

  @HostListener('click', ['$event'])
  // @HostListener('keyup', ['$event'])
  handleClick(event: MouseEvent) {
    // TODO: do something
  }

  // @HostListener('keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    // TODO: do something
  }
}
