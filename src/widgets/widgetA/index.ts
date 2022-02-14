import { Widget } from './Widget'
import { startWidget } from '../../utils'

// injected from build scripts and contains the raw css text
// @ts-ignore
export const mountWidget = startWidget(Widget, injected_styleContent_never_change_me);
