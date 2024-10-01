import { Component, OnInit } from '@angular/core';
import { Moment } from '../../../interfaces/Moments';
import { MomentService } from '../../../services/moment.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MomentFormComponent } from '../../moment-form/moment-form.component';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-edit-moments',
  standalone: true,
  imports: [RouterModule, CommonModule, MomentFormComponent],
  templateUrl: './edit-moments.component.html',
  styleUrl: './edit-moments.component.css',
})
export class EditMomentsComponent implements OnInit {
  moment!: Moment;
  btnText: string = 'Editar';

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private message: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getMoment(id).subscribe((item) => {
      this.moment = item.data;
    });
  }

  async editHandler(momentData: Moment) {
    const id = this.moment.id;
    const formData = new FormData();

    formData.append('title', momentData.title);
    formData.append('description', momentData.description);

    if (momentData.image) {
        formData.append('image', momentData.image);
    }

    
    this.momentService.updateMoment(id!, formData).subscribe({
        next: () => {
            this.message.add(`Momento ${id} foi atualizado com sucesso!`);
            this.router.navigate(['/']);
        },
        error: (err) => {
            console.error('Erro ao atualizar momento:', err);
            this.message.add('Ocorreu um erro ao atualizar o momento.');
        }
    });
}

}
