"use client";

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { authService } from '@/services/authService';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from '@/components/ui/card';
import { useState } from 'react';

const formSchema = z.object({
  firstName: z.string().min(2, { message: 'O nome deve ter pelo menos 2 caracteres.' }),
  lastName: z.string().min(2, { message: 'O sobrenome deve ter pelo menos 2 caracteres.' }),
  cpf: z.string().length(11, { message: 'O CPF deve ter 11 dígitos.' }),
  ddd: z.string().length(2, { message: 'O DDD deve ter 2 dígitos.' }),
  phone: z.string().min(8, { message: 'O telefone deve ter pelo menos 8 dígitos.' }),
  email: z.email({ message: 'Por favor, insira um email válido.' }),
  senha: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
});

type RegisterFormValues = z.infer<typeof formSchema>;

export function RegisterForm() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      cpf: '',
      ddd: '',
      phone: '',
      email: '',
      senha: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(data: RegisterFormValues) {
    console.log('Botão "Criar Conta" clicado e o formulário foi validado!');
    console.log('Dados do formulário:', data);
    setApiError(null);
    try {
      await authService.register(data);
      setSuccess(true);
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error: any) {
      setApiError(error.message || 'Ocorreu um erro. Tente novamente.');
    }
  }
  
  if (success) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sucesso!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-600">Conta criada com sucesso! Redirecionando para o login...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Crie sua Conta</CardTitle>
        <CardDescription>Preencha os campos abaixo para se cadastrar.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                            <Input placeholder="Seu nome" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Sobrenome</FormLabel>
                        <FormControl>
                            <Input placeholder="Seu sobrenome" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="seu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="senha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                    <Input placeholder="Apenas números" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <div className="grid grid-cols-3 gap-4">
                <FormField
                control={form.control}
                name="ddd"
                render={({ field }) => (
                    <FormItem className="col-span-1">
                    <FormLabel>DDD</FormLabel>
                    <FormControl>
                        <Input placeholder="51" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                    <FormItem className="col-span-2">
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                        <Input placeholder="912345678" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>

            {apiError && <p className="text-sm font-medium text-destructive">{apiError}</p>}
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Criando...' : 'Criar Conta' }
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}