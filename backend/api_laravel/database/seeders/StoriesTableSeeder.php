<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use \App\Models\Story;
class StoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $story1=new Story;
        $story1->title="Ya a la venta el nuevo libro de J.K.Rowling";
        $story1->body="El nuevo libro de la escritora se ha publicado esta mañana a nivel mundial.";
        $story1->save();

        $story2=new Story;
        $story2->title="Fallece un grande";
        $story2->body="El autor del famoso libro La casa de Penny falleció el pasado 19 de febrero.";
        $story2->save();

        $story3=new Story;
        $story3->title="Arturo Pérez Reverte dona 50.000€ a una ONG";
        $story3->body="El escritor ha revelado que recientemente realizó una donación de 50.000€ por aquellos sin hogar.";
        $story3->save();

    }
}
