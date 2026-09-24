import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './layout/footer';
import { AngularIcon, GithubIcon } from './layout/icons';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, AngularIcon, GithubIcon],
  templateUrl: './app.html',
})
export class App {}
