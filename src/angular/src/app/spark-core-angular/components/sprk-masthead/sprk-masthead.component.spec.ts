import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SparkMastheadComponent } from './sprk-masthead.component';
import { SparkWideNavigationComponent} from '../sprk-wide-navigation/sprk-wide-navigation.component';
import { SparkNarrowNavigationComponent} from '../sprk-narrow-navigation/sprk-narrow-navigation.component';
import { SparkNarrowNavigationItemComponent} from '../sprk-narrow-navigation-item/sprk-narrow-navigation-item.component';
import { SparkSecondaryNavigationComponent } from '../sprk-secondary-navigation/sprk-secondary-navigation.component';
import { SparkSecondaryNavigationItemComponent } from '../sprk-secondary-navigation-item/sprk-secondary-navigation-item.component';
import { SparkIconComponent } from '../sprk-icon/sprk-icon.component';

describe('SparkMastheadComponent', () => {
  let component: SparkMastheadComponent;
  let fixture: ComponentFixture<SparkMastheadComponent>;
  let mastheadElement: HTMLElement;
  let hamburgerIcon: HTMLElement;
  let clientGreeting: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        SparkMastheadComponent,
        SparkWideNavigationComponent,
        SparkNarrowNavigationComponent,
        SparkNarrowNavigationItemComponent,
        SparkSecondaryNavigationComponent,
        SparkSecondaryNavigationItemComponent,
        SparkIconComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SparkMastheadComponent);
    component = fixture.componentInstance;
    mastheadElement = fixture.nativeElement.querySelector('header');
    hamburgerIcon = mastheadElement.querySelector('.sprk-c-Hamburger');
  })

  it('should create itself', () => {
    expect(component).toBeTruthy();
  });

  it('should add classes when additionalClasses has a value', () => {
    component.additionalClasses = 'sprk-u-man';
    fixture.detectChanges();
    expect(mastheadElement.classList.toString()).toEqual('sprk-c-Masthead sprk-u-man');
  });

  it('should add the aria-expanded attribute and show the narrow nav when the icon is clicked', () => {
    expect(hamburgerIcon.getAttribute('aria-expanded')).toEqual(null);
    expect(component.isNarrowNavOpen).toEqual(false);
    hamburgerIcon.click();
    fixture.detectChanges();
    expect(hamburgerIcon.getAttribute('aria-expanded')).toEqual('true');
    expect(component.isNarrowNavOpen).toEqual(true);
  });

  it('should print Hello, Client Name, when a clientName is supplied', () => {
    component.clientName = "Some Guy";
    fixture.detectChanges();
    clientGreeting = mastheadElement.querySelector('.sprk-c-Masthead__secondary > p');
    expect(clientGreeting.textContent).toEqual('Hello, Some Guy');
  });

  it('shouldnt render a greeting if no client name is supplied', () => {
    clientGreeting = mastheadElement.querySelector('.sprk-c-Masthead__secondary > p');
    expect(clientGreeting).toEqual(null);
  });

  it('should close the narrow nav on resize', () => {
    component.isNarrowNavOpen = true;
    fixture.detectChanges();
    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();
    expect(component.isNarrowNavOpen).toEqual(false);
  });
});
