import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-password-generator',
  templateUrl: './password-generator.component.html',
  styleUrls: ['./password-generator.component.css'],
})
export class PasswordGeneratorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  upperCaseLetters: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  lowerCaseLetters: string[] = this.upperCaseLetters.map((letter) =>
    letter.toLowerCase()
  );
  numbers: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  symbols: string[] = '!@#$^&*()_+}{|":>?<'.split('');

  generatedPassword: string | undefined = undefined;
  error: string | undefined = undefined;
  success: string | undefined = undefined;

  onCopyPassword(value: string): void {
    navigator.clipboard.writeText(value);
    this.success = 'Password copied to clipboard';
  }
  onSubmit(form: NgForm): void {
    this.success = undefined;
    const { length, includeUppercaseLetters, includeNumbers, includeSymbols } =
      form.value;
    if (!length) {
      this.error = 'Length can"t be empty';
    } else {
      const password = this.generatePassword(
        length,
        includeUppercaseLetters,
        includeNumbers,
        includeSymbols
      );
      this.generatedPassword = password;
      this.error = undefined;
    }
  }
  generatePassword(
    length: number,
    includeUppercaseLetters: boolean,
    includeNumbers: boolean,
    includeSymbols: boolean
  ): string {
    let initialLetters: Array<string | number> = [...this.lowerCaseLetters];
    let password: Array<string | number> = [];
    if (includeUppercaseLetters) {
      initialLetters.push(...this.upperCaseLetters);
    }
    if (includeNumbers) {
      initialLetters.push(...this.numbers);
    }
    if (includeSymbols) {
      initialLetters.push(...this.symbols);
    }
    for (let i = 0; i < length; i++) {
      const randomNumber = Math.floor(Math.random() * initialLetters.length);
      password.push(initialLetters[randomNumber]);
    }
    return password.join('');
  }
}
