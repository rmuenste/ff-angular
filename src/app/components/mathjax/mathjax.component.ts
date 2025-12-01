import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { ConfigService } from 'src/app/config.service';

@Component({
  selector: 'app-mathjax',
  templateUrl: './mathjax.component.html',
  styleUrls: ['./mathjax.component.scss']
})
export class MathjaxComponent implements OnInit, OnChanges {
  @Input() content: string = "";

  constructor(private cs: ConfigService) { }

  mathJaxObject: any;

  ngOnInit(): void {
    this.renderMath();
    this.loadMathConfig();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['content'])
      this.renderMath();
  }

  updateMathObj() {
    let mathJaxGlobal: any = (this.cs.nativeGlobal() as any)['MathJax'];
    this.mathJaxObject = mathJaxGlobal;
  }

  renderMath() {
    this.updateMathObj();
    let componentRef = this;
    setTimeout( () => {
      componentRef.mathJaxObject['Hub'].Queue(["Typeset", componentRef.mathJaxObject.Hub])
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
