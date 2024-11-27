import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ApiClientService } from '../../services/api-client.service';
import { AuthService } from 'src/app/services/auth.service';
import { IonFabButton, IonFab, IonList, IonCardContent, IonHeader
  , IonToolbar, IonTitle, IonCard, IonCardHeader, IonCardTitle
  , IonCardSubtitle, IonItem, IonLabel, IonInput, IonTextarea
  , IonGrid, IonRow, IonCol, IonButton, IonIcon, IonContent
  , IonFabList } from '@ionic/angular/standalone';
import { pencilOutline, trashOutline, add } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Publicacion } from '../../model/publicacion';
import { showToast } from 'src/app/tools/message-routines';
import { addIcons } from 'ionicons';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/model/usuario';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { LanguageComponent } from 'src/app/components/language/language.component';


@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.scss'],
  standalone: true,
  imports: [IonList, IonHeader, IonToolbar, IonTitle, IonCard
    , IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem
    , IonLabel, IonInput, IonTextarea, IonGrid, IonRow, IonCol
    , IonButton, IonIcon, IonContent, IonCardContent
    , IonFab, IonFabButton, IonFabList
    , CommonModule, FormsModule,TranslateModule]
})
export class ForoComponent implements OnInit, OnDestroy {

  post: Publicacion = new Publicacion();
  posts: Publicacion[] = [];
  selectedPostText = '';
  intervalId: any = null;
  private postsSubscription!: Subscription;
  private userSubscription!: Subscription;
  Usuario = new Usuario();

  constructor( private translateService: TranslateService,private api: ApiClientService, private auth: AuthService) {
    addIcons({ pencilOutline, trashOutline, add });
    const lang = localStorage.getItem('lang') || 'es'
    this.translateService.setDefaultLang('es');
    this.translateService.use(lang);
  }



  
  ngOnInit() {
    this.postsSubscription = this.api.postList.subscribe((posts) => {
      this.posts = posts;
    });
    
    this.api.refreshPostList(); // Actualiza lista de posts al iniciar
  }

  ngOnDestroy() {
    if (this.postsSubscription) this.postsSubscription.unsubscribe();
  }

  cleanPost() {
    this.post = new Publicacion();
    this.selectedPostText = 'Nueva publicación';
  }

  savePost() {
    if (!this.post.title.trim()) {
      showToast('Por favor, completa el título.');
      return;
    }
    if (!this.post.body.trim()) {
      showToast('Por favor, completa el cuerpo.');
      return;
    }

    if (this.post.id) {
      this.updatePost();
    } else {
      this.createPost();
    }
  }

  private async createPost() {
    this.post.name = this.Usuario.nombre + ' ' + this.Usuario.apellido;
    const createdPost = await this.api.createPost(this.post);
    if (createdPost) {
      showToast(`Publicación creada correctamente: ${createdPost.title}`);
      this.cleanPost();
    }
  }

  private async updatePost() {
    this.post.name = this.Usuario.nombre + ' ' + this.Usuario.apellido;
    const updatedPost = await this.api.updatePost(this.post);
    if (updatedPost) {
      showToast(`Publicación actualizada correctamente: ${updatedPost.title}`);
      this.cleanPost();
    }
  }

  editPost(post: Publicacion) {
    this.post = { ...post }; // Crea una copia para editar sin afectar la lista
    this.selectedPostText = `Editando publicación #${post.id}`;
    document.getElementById('topOfPage')!.scrollIntoView({ behavior: 'smooth' });
  }

  async deletePost(post: Publicacion) {
    const success = await this.api.deletePost(post.id);
    if (success) {
      showToast(`Publicación eliminada correctamente: ${post.id}`);
      this.cleanPost();
    }
  }

  getPostId(index: number, post: Publicacion) {
    return post.id;
  }
}
