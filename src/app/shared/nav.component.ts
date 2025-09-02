import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-nav',
	standalone: true,
	imports: [CommonModule],
	template: `
		<nav class="nav-container">
            <h1>eMe</h1>
            <div class="menu-hamburger">
                <button>
                    <div></div>
                    <div></div>
                    <div></div>
                </button>
            </div>
            <div class="space">

            </div>
            <div class="img-profile">
                <button aria-label="Profile">
                    <img src="/assets/images/avatar.png" alt="Profile Image">
                </button>
            </div>
        </nav>
	`,
	styles: [
		`
        .nav-container {
            display: flex;
            align-items: center;
            padding: 15px 20px;
            background-color: #80c5fe;
            border-bottom: 1px solid #eee;
            font-family: 'Verdana', 'Segoe UI', Tahoma, Geneva, sans-serif;
        }
        .menu-hamburger button {
            background-color: transparent;
            border: none;
            cursor: pointer;
            padding: 8px;
            margin-left: 20px;
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        .menu-hamburger button div {
            width: 30px;
            height: 3px;
            background-color: #333;
        }
        .nav-container, .space {
            flex: 1;
        }
        .nav-container h1 {
            margin: 0;
            font-size: 24px;
        }
        .img-profile button {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #ff7300;
            border: none;
            cursor: pointer;
            margin-right: 0;
        }
        .img-profile img {
            width: 90%;
            height: 90%;
            border-radius: 50%;
            object-fit: cover;
        }
		`
	]
})
export class NavComponent {}
