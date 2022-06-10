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
  target_text: string = `bla bla lorem ipsum und so.  Hier kommt noch mehr Text.\nGib mir nen Line wraP?\nWie mach ich automatisch nen Line Wrap? \nHier Wrappe ich die lines oh yea.`;
  char_array = this.target_text.split('');
  INTERVAL: number = 10;

  constructor() { }

  ngOnInit(): void {
    this.char_array.forEach((c, i: number) => {this.char_array[i] = this.replaceByDots(c);});
    console.log(this.char_array)
    this.current_text = this.char_array.join('');
  }
  
  ngAfterViewInit() {
    const text_length:number = this.target_text.length;
    let index : number = 0;

    this.timerSubscription = timer(0, this.INTERVAL).pipe(
      takeWhile(() => index < text_length-1 ),
      map(() =>{
        this.char_array[index] = this.target_text.charAt(index);
        this.current_text = this.char_array.join('');
        // index = index + 1;
        index++;
      } ),
      ).subscribe()

      // setInterval( ()=>{
      //   console.log('works')
      //   }, 5000)
  }

  onClicked() : void {
    this.current_text = "bla bla this is some more text und so!"
    console.log("clocked")
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





}
