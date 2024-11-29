import userService from "@/services/userService";
import { useUsers } from "@/swrs/user";
import createUserValidator from "@/validators/createUserValidator";
import { Button, Text } from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RHFFormProvider, RHFInput, RHFSelect } from "@/components/hook-form";

export default function CreateUser() {
  const defaultValues = useMemo(() => {
    const mappingDefaultValues = () => {
      return {
        name: "",
        email: "",
        password: "",
        role: "",
      };
    };

    return mappingDefaultValues();
  }, []);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(createUserValidator.createUser),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  const userList = useUsers();

  const onSubmit = async (values) => {
    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
      role: values.role,
    };

    try {
      await userService.createUser(payload);
      userList.mutate();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <RHFFormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFInput
          label="Nama Karyawan"
          placeholder="Nama Karyawan"
          name="name"
          {...methods.register("name")}
        />
        <RHFInput
          label="Email Karyawan"
          name="email"
          type="email"
          placeholder="Email"
          {...methods.register("email")}
        />
        <RHFInput label="Password" placeholder="Password" name="password" />

        <RHFSelect
          label="Role Karyawan"
          placeholder="Pilih Role"
          name="role"
          options={[
            { value: "admin", label: "Admin" },
            { value: "user", label: "User" },
          ]}
        />

        <Button
          onClick={handleSubmit(onSubmit)}
          colorScheme="purple"
          isLoading={isSubmitting}
        >
          Simpan Karyawan
        </Button>
      </RHFFormProvider>

      {userList?.data?.results?.map((user) => (
        <Text key={user?.id}>{user?.name}</Text>
      ))}
    </>
  );
}
