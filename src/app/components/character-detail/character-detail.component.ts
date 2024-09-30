import { Component } from '@angular/core';
import { RickMortyService } from '../../Services/rick-morty.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent {
  dataOneCharacter?: any 
  episodes: string[] = []

  displayedEpisodes: string[] = []
  showMoreEpisodes: boolean = false
  episodesToShow: number = 15
  showLoadMoreButton: boolean = false

  errorMessage: string | null = null


  constructor( 
    private route: ActivatedRoute,
    private RickMortyService: RickMortyService,
    private router: Router,
  ){}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.getCaracterInfo(id)
  }
  
  getCaracterInfo(id: number) {
    this.RickMortyService.getOneCharacter(id).subscribe({
      next: (data: any) => {
        this.dataOneCharacter = data
        this.episodes = data.episode
        this.displayedEpisodes = this.episodes.slice(0, this.episodesToShow)

        if (this.episodes.length > this.episodesToShow) {
          this.showLoadMoreButton = true
        }
      },
      error: (error) => {
        console.error('Error:', error)
        this.errorMessage = 'Personaje no encontrado'
        this.router.navigate(['/404'])
      }
    });
  }

  loadMoreEpisodes() {
    this.showMoreEpisodes = true
    this.displayedEpisodes = this.episodes
    this.showLoadMoreButton = false
  }


  getStatusClass(status: string): string {
    if (status === 'Alive') {
      return 'text-success'
    } else if (status ==='Dead'){
      return 'text-danger'
    } else {
      return 'text-warning'
    }
  }
}
