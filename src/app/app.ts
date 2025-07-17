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
  showLeftArrow = false;
  showRightArrow = true;

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
    const firstCard = element.querySelector('.video-card') as HTMLElement;
    if (firstCard) {
      const cardWidth = firstCard.offsetWidth + 10;
      element.scrollBy({ left: cardWidth * 5, behavior: 'smooth' });
      this.updateArrows(element);
      setTimeout(() => this.updateArrows(element), 300);
    }
  }

  scrollLeft(element: HTMLElement) {
    const firstCard = element.querySelector('.video-card') as HTMLElement;
    if (firstCard) {
      const cardWidth = firstCard.offsetWidth + 10;
      element.scrollBy({ left: -(cardWidth * 5), behavior: 'smooth' });
      setTimeout(() => this.updateArrows(element), 300);
    }
  }
  updateArrows(element: HTMLElement) {
    const maxScrollLeft = element.scrollWidth - element.clientWidth;
    this.showLeftArrow = element.scrollLeft > 0;
    this.showRightArrow = element.scrollLeft < maxScrollLeft - 1; // -1, et jääks väike varu
  }

}
