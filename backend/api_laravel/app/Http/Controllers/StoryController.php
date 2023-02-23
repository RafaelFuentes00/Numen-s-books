<?php

namespace App\Http\Controllers;

use App\Models\Story;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class StoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $stories = Story::all();
        return response($stories);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $story = new Story;
        $story->title = $request->title;
        $story->body = $request->body;
        $story->save();
        $data=[
            'message'=>'story created successfuly',
            'story'=>$story
        ];
        return response()->json($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Story $story): Response
    {
        $data=[
            'message'=>'Story details',
            'story'=>$story,
        ];
        return response()->json($data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Story $story): Response
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Story $story): RedirectResponse
    {
        $story->title = $request->title;
        $story->body = $request->body;
        $story->save();
        $data=[
            'message'=>'Story updated successfuly',
            'Story'=>$story
        ];
        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Story $story): RedirectResponse
    {
        $story->delete();
        $data=[
            'message'=>'Story deleted successfuly',
            'story'=>$story
        ];
        return response()->json($data);
    }
}
