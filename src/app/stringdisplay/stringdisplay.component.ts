import { Component, OnInit } from '@angular/core';
import { Subscription, timer  } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
@Component({
  selector: 'app-stringdisplay',
  templateUrl: './stringdisplay.component.html',
  styleUrls: ['./stringdisplay.component.css']
})
export class StringdisplayComponent implements OnInit {

  timerSubscription: Subscription = new Subscription;
  current_text: string = ''
  target_text: string = 'Lorem ipsum\ndolor sit amet,\nconsectetur adipiscing elit,\nsed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\nGravida rutrum quisque non tellus orci.\nEnim eu turpis egestas pretium aenean pharetra magna ac. Vestibulum lectus mauris ultrices eros in cursus. Nunc aliquet bibendum enim facilisis gravida. Tincidunt eget nullam non nisi. \n\n\nVivamus at augue eget arcu. Viverra adipiscing at in tellus integer feugiat scelerisque varius. Sed cras ornare arcu dui. Fusce id velit ut tortor pretium viverra. At lectus urna duis convallis convallis tellus.\n\nTurpis egestas maecenas pharetra convallis posuere morbi leo.\n\nFaucibus pulvinar elementum integer enim neque volutpat ac tincidunt vitae. Risus ultricies tristique nulla aliquet enim tortor. Varius sit amet mattis vulputate enim nulla aliquet porttitor lacus.\nSed velit dignissim sodales ut eu.\nDictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nGravida rutrum quisque non tellus orci. Enim eu turpis egestas pretium aenean pharetra magna ac. Vestibulum lectus mauris ultrices eros in cursus. Nunc aliquet bibendum enim facilisis gravida. Tincidunt eget nullam non nisi. \n\n\nVivamus at augue eget arcu. Viverra adipiscing at in tellus integer feugiat scelerisque varius. Sed cras ornare arcu dui. Fusce id velit ut tortor pretium viverra. At lectus urna duis convallis convallis tellus. Turpis egestas maecenas pharetra convallis posuere morbi leo. Faucibus pulvinar elementum integer enim neque volutpat ac tincidunt vitae. Risus ultricies tristique nulla aliquet enim tortor. Varius sit amet mattis vulputate enim nulla aliquet porttitor lacus.\nLacinia at quis risus sed.\nMaecenas pharetra convallis posuere morbi leo urna molestie at elementum.\n Ultricies tristique nulla aliquet enim.\nSed velit dignissim sodales ut eu.\nDictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim.';
  char_array = this.target_text.split('');
  INTERVAL: number = 70;
  TOTAL_DURATION: number = 1300;
  FILL_CHAR = ' '

  constructor() { }

  ngOnInit(): void {
    this.char_array.forEach((c, i: number) => {this.char_array[i] = this.replaceBySpaces(c);});
    this.current_text = this.char_array.join('');
  }
  
  ngAfterViewInit() {
    const text_length:number = this.target_text.length;
    let index : number = 0;
    this.timerSubscription = timer(0, this.INTERVAL).pipe(
      takeWhile(() => index * this.INTERVAL < this.TOTAL_DURATION ),
      map(() =>{
        let completion: number = index * this.INTERVAL / this.TOTAL_DURATION;
        this.char_array = this.modulateArray(this.char_array, completion);
        this.current_text = this.char_array.join('');
        index++;
      } ),
      ).subscribe()
  }

  onEraseClicked() : void {
    this.timerSubscription.unsubscribe();
    let index : number = this.TOTAL_DURATION / this.INTERVAL;
    this.timerSubscription = timer(0, this.INTERVAL).pipe(
      takeWhile(() => index > -4 ),
      map(() =>{
        let completion: number = (index * this.INTERVAL / this.TOTAL_DURATION*2)-0.4;
        this.char_array = this.modulateArray(this.char_array, completion);
        this.current_text = this.char_array.join('');
        index--;
      } ),
      ).subscribe(() => {
        if (index < 0) console.log("Done"); }
        )
  }

  onWriteClicked() : void {
    this.timerSubscription.unsubscribe();
    let index : number = 0;
    this.timerSubscription = timer(0, this.INTERVAL).pipe(
      takeWhile(() => index * this.INTERVAL < this.TOTAL_DURATION, true ),
      map(() =>{
        let completion: number = index * this.INTERVAL / this.TOTAL_DURATION;
        this.char_array = this.modulateArray(this.char_array, completion);
        this.current_text = this.char_array.join('');
        index++;
      } ),
      ).subscribe()
  }

  ngOnDestroy(): void { 
    this.timerSubscription.unsubscribe(); 
  } 

  replaceByDots(char: string): string {
    if (char != '\n') return '.'; else return '\n';
  }

  replaceBySpaces(char: string): string {
    if (char != '\n') return ' '; else return '\n';
  }

  modulateArray(text: string[], completion: number): string[] {
    text.forEach((c, i) => {
      if (c == '\n' ) return;

      let relativeCompletion: number = Math.abs(completion - (i / text.length) ); 

      if (i / text.length > completion+0.1) {
          if (Math.random() > relativeCompletion+0.3 && this.target_text.charAt(i) != ' ') {
            text[i] = this.getRandomChar();
          } else text[i] = ' ';
        return;
      }

      if (Math.random() > completion+0.3) {
        text[i] = this.getRandomChar();
      } else {
        text[i] = this.target_text.charAt(i);
      }

      if (relativeCompletion > 0.2) {text[i] = this.target_text.charAt(i)}
    })
    return text;
  }

  getRandomChar(): string {
    let chars: string[] = [' ', '.', ',', '/', '"', '$', '#', '-', 'a', 'r'];
    return chars[Math.floor(Math.random() * chars.length)]


  }

}
