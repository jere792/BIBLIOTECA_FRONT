import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-libros',
  imports: [CommonModule],
  templateUrl: './lista-libros.html',
  styleUrl: './lista-libros.css',
})
export class ListaLibros {
  libros = [
    {
      titulo: 'Clean Code',
      autor: 'Robert C. Martin',
      precio: 89.90,
      
      imagen: 'https://m.media-amazon.com/images/I/41xShlnTZTL.jpg'
    },
    {
      titulo: 'El Principito',
      autor: 'Antoine de Saint-Exupéry',
      precio: 25.00, 

      imagen: 'https://m.media-amazon.com/images/I/71OZY035QKL.jpg'
    },
    {
      titulo: 'Hábitos Atómicos',
      autor: 'James Clear',
      precio: 59.90,

      imagen: 'https://m.media-amazon.com/images/I/81ANaVZk5LL.jpg'
    }
  ];
}
