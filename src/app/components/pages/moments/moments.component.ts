import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { Comment } from '../../../interfaces/Comment';
import { Moment } from '../../../interfaces/Moments';
import { MomentService } from '../../../services/moment.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../enviroments/enviroment';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MessageService } from '../../../services/message.service';
import { CommentService } from '../../../services/comment.service';


@Component({
  selector: 'app-moments',
  standalone: true,
  imports: [RouterModule, CommonModule, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './moments.component.html',
  styleUrls: ['./moments.component.css'],
})
export class MomentsComponent implements OnInit {
  moment?: Moment;
  baseApiUrl = environment.baseApiUrl;
  faTimes = faTimes;
  faEdit = faEdit;

  commentForm!: FormGroup;

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private message: MessageService,
    private router: Router,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getMoment(id).subscribe((item) => {
      console.log(item);
      this.moment = item.data;
    });

    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
    });
  }

  get text() {
    return this.commentForm.get('text')!;
  }

  get username() {
    return this.commentForm.get('username')!;
  }

  async removeHandler(id: number) {
    this.momentService.removeMoment(id).subscribe();

    this.message.add('Momento excluido com sucesso!');

    this.router.navigate(['/']);
  }

  async onSubmit(formDirect: FormGroupDirective) {
    if (this.commentForm.invalid) {
      return;
    }

   const data: Comment = this.commentForm.value

    data.momentId = Number(this.moment!.id)
    
    await this.commentService.createComment(data).subscribe((comment) => this.moment!.comments!.push(comment.data))
   
    this.message.add("Comentario adicionado!")

    this.commentForm.reset()

    formDirect.resetForm()
  }
}
