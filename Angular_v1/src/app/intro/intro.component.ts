import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
	selector: 'app-intro',
	templateUrl: './intro.component.html',
	styleUrls: ['./intro.component.scss']
})

export class IntroComponent {
		
	@Output() playerName = new EventEmitter();
	@Output() playerMail = new EventEmitter();
	@Output() logOn = new EventEmitter();

	public sendingIntroFormData(form: FormGroup) {
		this.playerName.emit(form.value.name);
		this.playerMail.emit(form.value.mail);
		this.logOn.emit();
	}
}
