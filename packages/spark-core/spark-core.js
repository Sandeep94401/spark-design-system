// Import all Spark-Core components
import { ssnInput } from './base/ssnInput';
import passwordInput from './base/passwordInput';
import { monetaryInput } from './base/monetaryInput';
import { phoneInput } from './base/phoneInput';
import { dateInput } from './base/dateInput';
import datePicker from './base/datePicker';
import { setupModals } from './components/modals';
import { requiredTextInput } from './base/requiredTextInput';
import { requiredTick } from './base/requiredTick';
import { requiredSelect } from './base/requiredSelect';
import { pagination } from './components/pagination';
import { tabs } from './components/tabs';
import { toggle } from './components/toggle';
import { spinners } from './components/spinners';

// Polyfills
import './utilities/polyfills/ArrayFrom';
import './utilities/polyfills/StringIncludes';
import './utilities/polyfills/ArrayFind';
import './utilities/polyfills/NodeListForEach';

// Init
requiredSelect();
requiredTick();
requiredTextInput();
ssnInput();
passwordInput();
monetaryInput();
phoneInput();
dateInput();
datePicker();
setupModals();
pagination();
tabs();
toggle();
spinners();
