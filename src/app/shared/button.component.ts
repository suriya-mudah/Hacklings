
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-button',
	standalone: true,
	imports: [CommonModule],
	template: `
		<button
			class="app-button"
			[attr.type]="type"
			[disabled]="disabled"
			[class.primary]="variant === 'primary'"
			[class.secondary]="variant === 'secondary'"
			[class.ghost]="variant === 'ghost'"
			[class.full-width]="fullWidth"
			(click)="onClick($event)">
			<ng-content></ng-content>
			<span [hidden]="!label" class="label" aria-hidden="{{ !label }}">{{ label }}</span>
		</button>
	`,
	styles: [
		`:host { display: inline-block; }

		/* Theme-aware tokens (use Material system tokens first, then app tokens, then hardcoded fallbacks) */
		button.app-button {
			font-family: Verdana, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif;
			padding: 0.5rem 1rem;
			border-radius: 6px;
			border: none;
			cursor: pointer;
			font-size: var(--button-font-size, 0.95rem);
			transition: background .12s ease, box-shadow .12s ease, transform .06s ease, color .12s ease;
			/* Primary by default; allow per-instance override via --button-bg / --button-color */
			background: var(--button-bg, var(--mat-sys-primary, var(--app-primary, #1976d2)));
			color: var(--button-color, var(--mat-sys-on-primary, var(--app-on-primary, #ffffff)));
			box-shadow: 0 1px 0 rgba(0,0,0,0.04);
			border: 1px solid transparent;
		}

		/* Primary hover: slightly darker mix */
			button.app-button.primary:hover:not(:disabled),
			button.app-button:hover:not(:disabled) {
				background: color-mix(in srgb, var(--button-bg, var(--mat-sys-primary, var(--app-primary, #1976d2))) 88%, black 12%);
			}

		/* Secondary variant uses secondary tokens */
			button.app-button.secondary {
				background: var(--button-secondary-bg, var(--mat-sys-secondary, var(--app-secondary, #e0e0e0)));
				color: var(--button-secondary-color, var(--mat-sys-on-secondary, var(--app-on-secondary, #111111)));
			}

			button.app-button.secondary:hover:not(:disabled) {
				background: color-mix(in srgb, var(--button-secondary-bg, var(--mat-sys-secondary, var(--app-secondary, #e0e0e0))) 90%, black 10%);
			}

		/* Ghost variant: transparent with a subtle outline */
			button.app-button.ghost {
				background: transparent;
				color: var(--button-ghost-color, var(--mat-sys-foreground, var(--app-foreground, inherit)));
				border: 1px solid var(--button-ghost-outline, var(--mat-sys-outline, var(--app-outline, currentColor)));
			}

		button.app-button:disabled {
			opacity: .5;
			cursor: not-allowed;
			filter: grayscale(.05);
		}
		button.app-button.full-width { width: 100%; display: block; }
		.label { margin-left: .4rem; }

		`,
	],
})
export class ButtonComponent {
	/** Button label (optional). If you project content, it will appear before the label. */
	@Input() label?: string;
	@Input() type: 'button' | 'submit' | 'reset' = 'button';
	@Input() variant: 'primary' | 'secondary' | 'ghost' = 'primary';
	@Input() disabled = false;
	@Input() fullWidth = false;
	@Output() pressed = new EventEmitter<Event>();

	onClick(e: Event) {
		if (this.disabled) {
			e.preventDefault();
			return;
		}
		this.pressed.emit(e);
	}
}
