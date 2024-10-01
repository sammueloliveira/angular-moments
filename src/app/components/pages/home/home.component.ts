import { Component, OnInit } from '@angular/core';
import { MomentService } from '../../../services/moment.service';
import { Moment } from '../../../interfaces/Moments';

import { CommonModule } from '@angular/common';
import { environment } from '../../../../enviroments/enviroment';
import { RouterModule } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allMoments: Moment[] = [];
  moments: Moment[] = [];
  baseApiUrl = environment.baseApiUrl;

  faSearch = faSearch;
  searchTorm: string = '';

  constructor(private momentService: MomentService) {}

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((items) => {
      console.log(items);
      if (items && items.data) {
        const data = items.data;

        data.map((item) => {
          if (item.created_at) {
            const date = new Date(item.created_at);
            if (!isNaN(date.getTime())) {
              const day = String(date.getDate()).padStart(2, '0');
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const year = date.getFullYear();
              item.created_at = `${day}/${month}/${year}`;
            } else {
              console.error('Data inválida:', item.created_at);
            }
          }
        });

        this.allMoments = data;
        this.moments = data;
      } else {
        console.error('Dados não encontrados na resposta');
      }
    });
  }

  search(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.moments = this.allMoments.filter((moment) => {
      return moment.title.toLocaleLowerCase().includes(value);
    });
  }
}
