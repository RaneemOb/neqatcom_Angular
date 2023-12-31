import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  constructor(public userService: UserService, public router: Router) {

  }
  UpdateForm = new FormGroup(
    {
      userid: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/),
      ]),
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phonenum: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      role: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/),
      ]),
      userimage: new FormControl('')
    }
  )


  get FirstName(): FormControl {
    return this.UpdateForm.get('firstname') as FormControl;
  }
  get LastName(): FormControl {
    return this.UpdateForm.get('lastname') as FormControl;
  }
  get Adderss(): FormControl {
    return this.UpdateForm.get('address') as FormControl;
  }
  userId: any
  userImage: any
  async ngOnInit() {
    let user: any = await localStorage.getItem('user')
    user = await JSON.parse(user)
    this.userId = await parseInt(user.Userid)
    await this.userService.GetUserById(this.userId)
    await this.UpdateForm.patchValue(this.userService.userById)
    this.userImage = this.userService.userById.userimage
  }
  updateInfo() {
    this.UpdateForm.controls['userid'].setValue(this.userId)
    this.UpdateForm.controls['role'].setValue("Lender")
    this.userService.UpdateUser(this.UpdateForm.value)
  }
 async UploadImage(input: any) {
    if (input.files[0] != null) {
      let uplodedFile = input.files[0]; // image fille
      let formdata = new FormData();
      formdata.append('file', uplodedFile);
      this.userService.UploadImage(formdata);
    }
await this.ngOnInit()
  }

  get UserName(): FormControl {
    return this.UpdateForm.get('username') as FormControl;
  }


  get Email(): FormControl {
    return this.UpdateForm.get('username') as FormControl;
  }

  get PhoneNumber(): FormControl {
    return this.UpdateForm.get('phonenum') as FormControl;
  }
}
