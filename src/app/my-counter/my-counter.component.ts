import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { increment, decrement, reset } from '../counter.actions';

/* Lazy Loading, unreladed to Ngrx */
import { ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

@Component({
  selector: 'app-my-counter',
  templateUrl: './my-counter.component.html',
  styleUrls: ['./my-counter.component.scss']
})
export class MyCounterComponent {

  // Create observable and define type (rxjs)
  count$: Observable<number>;

  // Import Store type variable and assign to var store
  constructor(
    private store: Store<{ count: number }>,
    private vcf: ViewContainerRef,
    private ctr: ComponentFactoryResolver
    ) {
    // Select is an operator from Ngrx
    this.count$ = store.pipe(select('count'));
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }

  // Lazy Loading Method
  async getLazyComponent() {
    // Clear the Ref
    this.vcf.clear();
    // Import the component in a constant
    const { LazyLoadingComponent } = await import('../lazy-loading/lazy-loading.component');
    this.vcf.createComponent(
      this.ctr.resolveComponentFactory(LazyLoadingComponent)
      );
  }

}
