import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ConfigService } from 'src/app/config.service';

@Component({
  selector: 'app-mathjax',
  templateUrl: './mathjax.component.html',
  styleUrls: ['./mathjax.component.css']
})
export class MathjaxComponent implements OnInit {
  @Input() content: string = "";

  constructor(private cs: ConfigService) { }

  mathJaxObject: any;

  ngOnInit(): void {
    this.renderMath();
    this.loadMathConfig();
  }

  ngOnchanges(changes: SimpleChanges) {
    if(changes['content'])
      this.renderMath();
  }

  updateMathObj() {
    let obj: any = this.cs.nativeGlobal()['MathJax'];
    this.mathJaxObject = obj;
  }

  renderMath() {
    this.updateMathObj();
    let angObj = this;
    setTimeout( () => {
      angObj.mathJaxObject['Hub'].Queue(["Typeset", angObj.mathJaxObject.Hub])
    }, 1000);
  }

  loadMathConfig() {
    this.updateMathObj();
    this.mathJaxObject.Hub.Config({
      showMathMenu: false,
      tex2jax: { inlineMath: [["$", "$"]],displayMath:[["$$", "$$"]] },
      menuSettings: { zoom: "Double-Click", zscale: "150%" },
      CommonHTML: { linebreaks: { automatic: true } },
      "HTML-CSS": { linebreaks: { automatic: true } },
      SVG: { linebreaks: { automatic: true } },
      TeX: {
        extensions: ["AMSmath.js", "AMSsymbols.js"]
      }
    });
  }

}
