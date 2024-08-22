import { Component } from '@angular/core';
import {
  ButtonDirective,
  FormControlDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  ToastBodyComponent, ToastComponent, ToasterComponent, ToastHeaderComponent
} from "@coreui/angular";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {IconDirective} from "@coreui/icons-angular";
import {NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {PersonaService} from "../../service/persona.service";
import {Persona} from "../../model/persona";

@Component({
  selector: 'app-persona',
  standalone: true,
  imports: [ButtonDirective,
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
  providers:[PersonaService],
  templateUrl: './persona.component.html',
  styleUrl: './persona.component.scss'
})
export class PersonaComponent {
  personaForm: FormGroup;
  personas: Persona[] = [];
  isEditing = false;
  selectedPersona: Persona | null = null;

  constructor(private fb: FormBuilder, private personaService: PersonaService) {
    this.personaForm = this.fb.group({
      id: [''],
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      ubicacion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.listarPersonas();
  }

  listarPersonas(): void {
    this.personaService.listar().subscribe(personas => {
      this.personas = personas;
    });
  }

  onSubmit(): void {
    if (this.personaForm.valid) {
      const persona: Persona = this.personaForm.value;
      if (this.isEditing) {
        this.personaService.editar(persona).subscribe(() => {
          this.listarPersonas();
          this.resetForm();
        });
      } else {
        this.personaService.crear(this.personaForm.value).subscribe(() => {
          this.listarPersonas();
          this.resetForm();
        });
      }
    }
  }

  editPersona(persona: Persona): void {
    this.isEditing = true;
    this.selectedPersona = persona;
    this.personaForm.patchValue(persona);
  }

  deletePersona(id: number | undefined): void {
    if (id !== undefined) {
      this.personaService.eliminar(id).subscribe(() => {
        this.listarPersonas();
      });
    } else {
      console.error('ID de persona es undefined');
    }
  }

  resetForm(): void {
    this.personaForm.reset();
    this.isEditing = false;
    this.selectedPersona = null;
  }

}
