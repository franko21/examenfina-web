import { Component } from '@angular/core';
import {Materia} from "../../model/materia";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MateriaService} from "../../service/materia.service";
import {
  ButtonDirective,
  FormControlDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  ToastBodyComponent, ToastComponent, ToasterComponent, ToastHeaderComponent
} from "@coreui/angular";
import {IconDirective} from "@coreui/icons-angular";
import {NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";

@Component({
  selector: 'app-materia',
  standalone: true,
  imports: [    ButtonDirective,
    FormControlDirective,
    FormsModule,
    IconDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    NgForOf,
    NgIf,
    NgxPaginationModule,
    ReactiveFormsModule,
    ToastBodyComponent,
    ToastComponent,
    ToastHeaderComponent,
    ToasterComponent],
  providers:[MateriaService],
  templateUrl: './materia.component.html',
  styleUrl: './materia.component.scss'
})
export class MateriaComponent {
  materias: Materia[] = [];
  materiaForm: FormGroup;
  isEditing: boolean = false;
  editingMateriaId?: number;

  constructor(
    private materiaService: MateriaService,
    private formBuilder: FormBuilder
  ) {
    this.materiaForm = this.formBuilder.group({
      id: [null],
      nombre: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.listarMaterias();
  }

  listarMaterias(): void {
    this.materiaService.listar().subscribe(
      (materias) => {
        this.materias = materias;
      },
      (error) => {
        console.error('Error al listar materias', error);
      }
    );
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.materiaService.editar(this.materiaForm.value).subscribe(
        (materia) => {
          this.listarMaterias();
          this.resetForm();
        },
        (error) => {
          console.error('Error al actualizar la materia', error);
        }
      );
    } else {
      this.materiaService.crear(this.materiaForm.value).subscribe(
        (materia) => {
          this.listarMaterias();
          this.resetForm();
        },
        (error) => {
          console.error('Error al crear la materia', error);
        }
      );
    }
  }

  editMateria(materia: Materia): void {
    this.isEditing = true;
    this.editingMateriaId = materia.id;
    this.materiaForm.patchValue(materia);
  }

  deleteMateria(id: number | undefined) {
    if (id !== undefined) {
      this.materiaService.eliminar(id).subscribe({
        next: () => this.materias = this.materias.filter(m => m.id !== id),
        error: (err) => console.error('Error al eliminar la materia:', err)
      });
    } else {
      console.error('ID de materia es undefined');
    }
  }


  resetForm(): void {
    this.isEditing = false;
    this.editingMateriaId = undefined;
    this.materiaForm.reset();
  }
}
