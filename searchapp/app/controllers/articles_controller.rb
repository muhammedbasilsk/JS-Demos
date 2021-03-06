
class ArticlesController < ApplicationController
  # GET /articles
  # GET /articles.json
  def index
    @articles = Article.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @articles }
    end
  end

    # GET /articles/search
  def search
    @articles = Article.search params[:q]
    render :action => "index"
  end
   # GET /articles/sort

  # GET /articles/sort.json
 def sort
    @s = Post.search do
      query { string 'Obama' }
      sort  { by :created_at, 'desc' }
      size 10000
    end
    respond_to do |format|
      format.json { render json: @s }
    end
  end
  
  def fulldata
    @s = Post.search do
      query { string '*' }
      sort  { by :created_at, 'desc' }
      size 30000
    end
    respond_to do |format|
      format.json { render json: @s }
    end
  end

  # GET /articles/facet.json
  def facet
    @s = Post.search do
     query { string 'obama' }
     facet 'tags' do 
       terms :country, :size => 1000
     end
    end
    respond_to do |format|
      format.json { render json: @s.facets }
    end
  end
  
   # GET /articles/filter.json
  def filter
    @s = Post.search do
     query { string 'obama' }
     filter :term , :country => 'India'
    end
    respond_to do |format|
      format.json { render json: @s }
    end
  end
  
    # GET /articles/orfilter.json
   def orfilter
    @post = Post.search do
      query { string 'content:why' }
     filter :or, [
      {:not => {:exists => {:field => :continent}}},
      {:terms => {:continent => ['Asia','North America']} }
    ]
    end
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @post }
    end
    end

# GET /articles/andfilter.json
  def andfilter
    @post = Post.search do
     filter :and, [
      {:terms => {:continent => ['Africa']}},
      {:terms => {:country => ['South Sudan']} }
    ]
    end
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @post }
    end
    end

  
   # GET /articles/highlight.json
  def highlight
   @post = Post.search do
     query { string 'content:why' }
     highlight :content, :options => { :tag => '<strong class="highlight">' }
   end
   respond_to do |format|
     format.html # new.html.erb
     format.json { render json: @post }
   end
 end
 
  # GET /articles/range.json
  def range
   @s = Post.search do
     query { string 'obama' }
     filter  :range , 'created_at' => { :from => '2013-01-01T17:35:08', :to => '2013-01-31T17:35:08' } 
    
   end
   respond_to do |format|
     format.html # new.html.erb
     format.json { render json: @s }
   end
 end
 
 # GET /articles/paging.json
  def paging
    @post = Post.search do
      from  0
      size 5
      query { string 'content:why' }
    end
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @post }
    end
   end

 # GET /articles/geo.json
  def geo
    @post = Post.search do
    sort  { by :_geo_distance, {
              :point => [-40, 70],
              :order => 'asc',
              :unit => 'km'
    }}
    end
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @post}
    end
    end

 
  # GET /articles/1

  # GET /articles/1.json
  def show
    @article = Article.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @article }
    end
  end

  # GET /articles/new
  # GET /articles/new.json
  def new
    @article = Article.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @article }
    end
  end

  # GET /articles/1/edit
  def edit
    @article = Article.find(params[:id])
  end

  # POST /articles
  # POST /articles.json
  def create
    @article = Article.new(params[:article])

    respond_to do |format|
      if @article.save
        format.html { redirect_to @article, notice: 'Article was successfully created.' }
        format.json { render json: @article, status: :created, location: @article }
      else
        format.html { render action: "new" }
        format.json { render json: @article.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /articles/1
  # PUT /articles/1.json
  def update
    @article = Article.find(params[:id])

    respond_to do |format|
      if @article.update_attributes(params[:article])
        format.html { redirect_to @article, notice: 'Article was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @article.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /articles/1
  # DELETE /articles/1.json
  def destroy
    @article = Article.find(params[:id])
    @article.destroy

    respond_to do |format|
      format.html { redirect_to articles_url }
      format.json { head :no_content }
    end
  end
end
