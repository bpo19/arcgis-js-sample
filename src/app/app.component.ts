import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy
} from '@angular/core';

import { loadModules, setDefaultOptions } from 'esri-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  public view: any = null;

  @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;

  async initializeMap(): Promise<any> {
    setDefaultOptions({ version: '4.19' });

    const [WebMap, SceneView] = await loadModules([
      'esri/WebMap',
      'esri/views/SceneView'
    ])

    const container = this.mapViewEl.nativeElement;

    const webmap = new WebMap({
      portalItem: {
        id: 'aa1d3f80270146208328cf66d022e09c',
      },
    });
    console.log(webmap.isResolved(), webmap.isFulfilled(), webmap.isRejected())
    await webmap.load();
    console.log(webmap.isResolved(), webmap.isFulfilled(), webmap.isRejected())
    await webmap.when();
    console.log(webmap.isResolved(), webmap.isFulfilled(), webmap.isRejected())

    const view = new SceneView({
      container,
      map: webmap
    });
    await view.when();

    this.view = view;
    return this.view.when();
  }

  ngOnInit(): any {
    this.initializeMap().then(() => {
      console.log('The map is ready.');
      const zoom = this.view.zoom;
      setInterval(() => {
        this.view.zoom = zoom + 1;
      }, 4000);
      setTimeout(() => {
        setInterval(() => {
          this.view.zoom = zoom - 1;
        }, 4000);
      }, 2000);
    });
  }

  ngOnDestroy(): void {
    if (this.view) {
      this.view.destroy();
    }
  }
}