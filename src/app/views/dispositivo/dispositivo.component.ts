import { Component,NgModule,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule,FormBuilder,FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  AvatarComponent,
  InputGroupTextDirective,
  FormControlDirective,
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  InputGroupComponent,
  ColComponent,
  ProgressComponent,
  RowComponent,
  TableDirective
} from '@coreui/angular';

import { IconDirective } from '@coreui/icons-angular';
import { Dispositivo } from 'src/app/model/dispositivo.model';
import { DipositivoService } from 'src/app/service/dispositivo.service';
import { MarcaService } from 'src/app/service/marca.service';
import { ModeloService } from 'src/app/service/modelo.service';
import { CategoriaService }from 'src/app/service/categoria.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { Marca } from 'src/app/model/marca.model';
import { Modelo } from 'src/app/model/modelo.model';
import { Categoria } from 'src/app/model/categoria.model';
import { HttpClientModule } from '@angular/common/http'; 
import { NgModel } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dispositivo',
  standalone: true,
  imports: [
    ProgressComponent,
    AvatarComponent,
    CommonModule,
    CardBodyComponent,
    CardComponent,
    RowComponent,
    ColComponent,
    IconDirective,
    TableDirective,
    NgxPaginationModule,
    HttpClientModule,
    InputGroupComponent,
    InputGroupTextDirective,
    FormControlDirective,
    ButtonDirective,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers:[DipositivoService,ModeloService,MarcaService,CategoriaService],
  templateUrl: './dispositivo.component.html',
  styleUrl: './dispositivo.component.scss'
})
export class DispositivoComponent implements OnInit {
   public dispositivo:Dispositivo=new Dispositivo();
   public categoriaselet: Categoria | null = new Categoria();
   public modeloselet: Modelo | null = new Modelo();
   public categoriamod: Categoria = new Categoria();
   public modelomod: Modelo = new Modelo();
   public titulo: string = "Dispositivo";
   dispositivos: Dispositivo[] = [];
   marcas:Marca[]=[];
   modelos:Modelo[]=[];
   categorias:Categoria[]=[];
   dispositivoSeleccionado: string ='';
   Seleccionado: string ='';
   p: number = 1;
   showTable: boolean = true;
   showTablem: boolean = true;
   showTablec: boolean = true;
   registerForm: FormGroup;




  toggleView() {
    this.showTable = !this.showTable;
     this.titulo="Dispositivo"
  }
  toggleViewm() {
    this.showTablem = !this.showTablem;
     this.titulo="Dispositivo"
  
  }
  toggleViewc() {
    this.showTablec = !this.showTablec;
     this.titulo="Dispositivo"
   
  }
  constructor(private serdispo:DipositivoService , private sermarca:MarcaService, private sermodelo:ModeloService, private sercateg:CategoriaService ,private router: Router,fb:FormBuilder){
  }
  ngOnInit(): void {
    this.listardispo();
    this.listarmode();
    this.listarcategorias();
    this.listarmarcas();   
  }
  listardispo() {
    this.serdispo.listar().subscribe(
      dispositivos => {
        this.dispositivos = dispositivos;   
      },
      error => {
        console.error('Error al listar dispositivos:', error);
      }
    );
  }
  listarmode() {
    this.sermodelo.listar().subscribe(
      modelos => {
        this.modelos = modelos;
      },
      error => {
        console.error('Error al listar modelos:', error);
      }
    );
  }
  listarmarcas() {
    this.sermarca.listar().subscribe(
      marcas => {
        this.marcas = marcas;
      },
      error => {
        console.error('Error al listar marcas:', error);
      }
    );
  }

  listarcategorias() {
    this.sercateg.listar().subscribe(
      categorias => {
        this.categorias = categorias;
      },
      error => {
        console.error('Error al listar categorías:', error);
      }
    );
  }

  crearDispositivo() {
    this.asignacatmar() 
    console.log(this.categoriaselet);
    console.log(this.modeloselet);
    if (this.validateForm()) {
      //////////
    this.serdispo.crear(this.dispositivo).subscribe(
      () => { 
        if(this.titulo=="Ingresar dispostivo"){
          Swal.fire({
            icon: 'success',
            title: '¡Dispositivo creado con éxito!',
            text: 'EXITO',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          });
        }else{
          console.log(this.dispositivo);
          Swal.fire({
            icon: 'success',
            title: '¡Dispositivo Editado con éxito!',
            text: 'EXITO',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          });
        }
        this.toggleView();
        this.showTablem=true;
        this.showTablec=true;
        this.vaciarcampos();
        this.listardispo();
      },
      error => {
        console.error('Error al crear dispositivo:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al crear el dispositivo. Inténtalo de nuevo más tarde.',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK'
        });
      }
    );  
    }
    
  }

  editardispo(dispo: Dispositivo) {
    this.dispositivo = structuredClone(dispo); // Utilizar structuredClone para una copia profunda
    this.asigparaedit();
    this.showTablem = false;
    this.toggleView();
    this.titulo = "Editar dispostivo";
  }


  asignacatmar() {
    if (this.dispositivo && this.categoriaselet&&this.modeloselet) {
      if(this.titulo=="Ingresar dispostivo"){
      this.dispositivo.categoria = this.categoriaselet;
      this.dispositivo.modelo = this.modeloselet;
      }else{
        this.dispositivo.categoria = this.categoriamod;
        this.dispositivo.modelo = this.modelomod;
      }

     

      
    }
    console.log(this.categoriaselet);
    console.log(this.modeloselet);

  }
  asigparaedit() {
    if (this.dispositivo) {
      if (this.dispositivo.categoria) {
        this.categoriamod = this.dispositivo.categoria;
      }
      if (this.dispositivo.modelo) {
        this.modelomod = this.dispositivo.modelo;
      }
    }
    console.log(this.categoriaselet);
    console.log(this.modeloselet);
  }

 eliminardispo(dispo:Dispositivo){
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.serdispo.eliminar(dispo.idDispositivo!).subscribe(
          () => {
            Swal.fire(
              '¡Eliminado!',
              'El dispositivo ha sido eliminado.',
              'success'
            );
            this.listardispo(); // Actualizar la lista de dispositivos después de eliminar uno
          },
          (error) => {
            console.error('Error al eliminar dispositivo:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un problema al eliminar el dispositivo. Inténtalo de nuevo más tarde.',
              confirmButtonColor: '#d33',
              confirmButtonText: 'OK'
            });
          }
        );
      }
    });
  }

  vaciarcampos(): void {
  this.dispositivo = new Dispositivo();
  this.categoriaselet= new Categoria();
  this.modeloselet =new Modelo();
  this.modelomod=new Modelo();
  this.categoriamod=new Categoria();
  }
  cancelar(): void{
  this.toggleView();
  this.showTablec=true;
  this.showTablem=true;
  this.vaciarcampos();
  }

  cancelarm(): void{
    this.toggleView();
    this.vaciarcampos();
    }
  
  btncrear(): void{
    this.categoriaselet = null;
    this.modeloselet=null;
    this.toggleView();
    this.toggleViewc();
    this.titulo="Ingresar dispostivo"
    }
    validateForm(): boolean {
      // Verificar si los campos obligatorios están llenos
      if (
        !this.dispositivo ||
        !this.dispositivo.nombre ||
        !this.dispositivo.categoria ||
        !this.dispositivo.modelo ||
        !this.dispositivo.numSerie// ||
        //!this.dispositivo.disponible
      ) {
        Swal.fire('¡Error!', 'Por favor, completa todos los campos obligatorios.', 'error');
        return false;
      }
      return true;
    }

}
