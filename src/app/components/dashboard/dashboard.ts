import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TreeSelectModule } from 'primeng/treeselect';
import { FormsModule } from '@angular/forms';
import { TreeNode } from 'primeng/api';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TreeSelectModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  private router = inject(Router);

  user: any = null; // user bilgilerini saklayacagim yer (localStorage`den cekilecek ve html`de gosterilecek)

  nodes: TreeNode[] = [
    {
      key: '0', label: 'Document', children: [
         {key: '0-0', label: 'Work'},
         {key: '0-1', label: 'Home'}
      ]
    },
    {key: '1', label: 'Pictures', children: [{key: '1-0', label: 'Travel' }]}
  ];

  selectedNodes: any[] = [];

  ngOnInit() {
    const storedUser = localStorage.getItem('user');

    if(storedUser) {
      this.user = JSON.parse(storedUser);
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
