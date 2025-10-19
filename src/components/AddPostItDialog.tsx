'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { collection, serverTimestamp } from 'firebase/firestore';
import { useFirestore, useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';

const postItSchema = z.object({
  text: z.string().min(1, 'A mensagem não pode estar vazia.').max(280, 'A mensagem é muito longa.'),
  author: z.string().min(1, 'O nome não pode estar vazio.').max(50, 'O nome é muito longo.'),
  color: z.string(),
});

const postItColors = [
  { value: 'bg-yellow-200', name: 'Amarelo' },
  { value: 'bg-blue-200', name: 'Azul' },
  { value: 'bg-green-200', name: 'Verde' },
  { value: 'bg-pink-200', name: 'Rosa' },
  { value: 'bg-purple-200', name: 'Roxo' },
];

export function AddPostItDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();
  const { user } = useUser();

  const form = useForm<z.infer<typeof postItSchema>>({
    resolver: zodResolver(postItSchema),
    defaultValues: {
      text: '',
      author: '',
      color: postItColors[0].value,
    },
  });

  const { formState: { isSubmitting } } = form;

  async function onSubmit(values: z.infer<typeof postItSchema>) {
    if (!firestore || !user) {
        toast({
            title: 'Erro',
            description: 'Você precisa estar autenticado para criar uma nota.',
            variant: 'destructive',
        });
        return;
    }

    try {
      await addDocumentNonBlocking(collection(firestore, 'postits'), {
        text: values.text,
        authorName: values.author,
        backgroundColor: values.color,
        reactions: { '❤️': 0, '🙏': 0, '🙌': 0, '🕊️': 0 },
        createdAt: serverTimestamp(),
        userId: user.uid,
      });

      form.reset();
      setOpen(false);
    } catch (error) {
      console.error('Error adding document: ', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível criar a nota. Tente novamente.',
        variant: 'destructive',
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 border-0 font-semibold px-6 py-3 rounded-xl"
        >
          <Plus className="mr-2 h-5 w-5" />
          Criar Nota
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deixe sua mensagem</DialogTitle>
          <DialogDescription>
            Compartilhe um pedido de oração, um agradecimento ou um pensamento.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensagem</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Escreva sua mensagem aqui..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seu Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Cor da Nota</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-wrap gap-2"
                    >
                      {postItColors.map((color) => (
                        <FormItem key={color.value} className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={color.value} className="sr-only" />
                          </FormControl>
                          <FormLabel
                            className={cn(
                              "flex items-center justify-center h-8 w-8 rounded-full border-2 border-transparent cursor-pointer ring-offset-background [&:has([data-state=checked])]:ring-2 [&:has([data-state=checked])]:ring-ring",
                              color.value
                            )}
                            title={color.name}
                          />
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Publicando...' : 'Publicar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
