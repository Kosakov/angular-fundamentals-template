import { Component, Input } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas, IconName } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  providers: [RouterLinkWithHref]
  
  
})
export class ButtonComponent {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
@Input() buttonText?:string;
@Input() icon?: IconName; 
  }
