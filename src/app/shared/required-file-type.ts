import { FormControl } from '@angular/forms';

export function requiredFileType(allowedTypes: string[]) {
  return (control: FormControl) => {
    const file = control.value;
    if (file) {
      const extension = file.split('.')[1].toLowerCase();
      if (allowedTypes.includes(extension.toLowerCase())) {
        return null;
      }
      return {
        coverImageFile: true,
      };
    }

    return null;
  };
}
