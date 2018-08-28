import { Component } from '@angular/core';

@Component({
  selector: 'sprk-toggle-docs',
  template: `
    <div class="drizzle-o-ContentGrouping">
      <h2 class="drizzle-b-h2">
        Toggle
      </h2>

      <sprk-toggle
        toggleType="base"
        title="This is a Spark toggle!"
        body="This is some copy for the toggle about toggle things."
        analyticsString="My disclaimer Title">
      </sprk-toggle>
    </div>
  `,
  styles: ['']
})
export class ToggleDocsComponent {
  constructor() {}
}