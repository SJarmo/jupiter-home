import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ErrService } from './err.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  protected title = 'JUPITER';
  categories: any[] | null = null;

  constructor(private errService: ErrService) {}

  ngOnInit(): void {
    this.errService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.data.category.frontPage;
        console.log(this.categories);
      },
      error: (err) => console.error(err)
    });
  }

  scrollRight(element: HTMLElement) {
    element.scrollBy({ left: 200, behavior: 'smooth' });
  }
}
