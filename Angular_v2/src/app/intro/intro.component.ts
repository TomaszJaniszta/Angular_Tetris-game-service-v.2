import { Component, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../storage.service';		
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-intro',
	templateUrl: './intro.component.html',
	styleUrls: ['./intro.component.scss']
})

export class IntroComponent implements OnInit{

	public loginForm: FormGroup;
	public color: string = 'normal';

	constructor(
		public fb: FormBuilder,
		private _router: Router, 
		private _service: StorageService,
		private _http: HttpClient
		) {

		this.loginForm = this.fb.group({
			name: ['',[	Validators.required, Validators.minLength(5)]],
			mail: ['',[ Validators.required, Validators.minLength(4)]],
			settings: this.fb.group({
				color1: ['normal', []], // select
				// color2: [false, []]
			})
		});

		// this.loginForm.get(['settings', 'color2'])!.valueChanges.subscribe(color2 => { // wersja checkbox
		// 	if (!color2) {
		// 	  alert(color2); // false
		// 	}
		// });

		this.loginForm.get(['settings', 'color1'])!.valueChanges.subscribe(color1 => { // ! opcja zabezp. przed null
			//   alert(color1); // false
			  this.color = color1;
		});
	};

	public playerName: string = ''; 
	public playerMail: string = ''; //token
	public playerNameLocalStorage: string = "enter your name here"

	private _login(color: string) {
		const URL = 'http://localhost:8080/check-token';
		// const URL = 'http://scores.chrum.it/check-token';
		const body = { 'auth-token': this.playerMail };
		return this._http.post(URL, body)
		.subscribe((result) => {
			console.log(result);
			let result2 = JSON.parse(JSON.stringify(result));
			if (result2.success === true){
				alert(`Good token!`);
				// log in without colors
				// this._router.navigate(['/game']);
				// log in with color
				// if (color === 'contrast'){ this._service.highContrastOn = true } else {
					// this._service.highContrastOn = false 
					// console.log(this._service.highContrastOn);
				// }
				window.localStorage.setItem("playerName", this.playerName);
				// window.localStorage.setItem("token", this.playerMail);
				console.log("localStorage: "+ window.localStorage.getItem("playerName"));
				this._router.navigate(['/game', color]);
			}else{
				alert(`Bad token!`);
				window.location.reload(); // reload page	
			};
		});
	};

	private _fillPartially(): void {
		this.loginForm.patchValue(
		  { name: this.playerNameLocalStorage },
		  { emitEvent: false }
		);
	};

	ngOnInit(): void {	
		let storage = window.localStorage.getItem("playerName");
		if(storage){
			this.playerNameLocalStorage = storage;
			console.log(this.playerNameLocalStorage);
			this._fillPartially();
		};
		// window.localStorage.clear();
		this.playerName = this._service.readPlayer(); // from storage service
		this.playerMail = this._service.readMail();     // from storage service 	
	}		

	public sendingIntroFormData(form: FormGroup) {
		this.playerName = form.value.name;
		this._service.player = this.playerName; // save to storage
		this.playerMail = form.value.mail;
      	this._service.mail = this.playerMail; // save to storage // token
		this._login(this.color); // log in if token reponse is true
	}
}