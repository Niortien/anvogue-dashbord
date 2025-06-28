 <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Articles & Variantes</h1>
          <p className="text-gray-600 mt-1">Gérez votre catalogue d&apos;articles et leurs variantes</p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAddArticle} className="bg-blue-600 hover:bg-blue-700">
                <Plus size={20} className="mr-2" />
                Nouvel Article
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingArticle ? 'Modifier l\'article' : 'Nouvel article'}
                </DialogTitle>
              </DialogHeader>
             <form onSubmit={handleSubmit(handleSubmitArticle)} className="space-y-6 px-4 bg-white">
  {/* Nom et Description */}
  <div className="space-y-4">
    <div>
      <Label htmlFor="nom" className="text-sm font-medium text-gray-700">
        Nom <span className="text-red-500">*</span>
      </Label>
      <Input 
        id="nom" 
        {...register('nom')} 
        placeholder="Nom de l'article"
        className="mt-1"
      />
      {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom.message}</p>}
    </div>

    <div>
      <Label htmlFor="description" className="text-sm font-medium text-gray-700">
        Description
      </Label>
      <Textarea 
        id="description" 
        {...register('description')} 
        placeholder="Description de l'article"
        rows={3}
        className="mt-1"
      />
      {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
    </div>
  </div>

  {/* Catégorie et Collection */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <Label htmlFor="categorie_id" className="text-sm font-medium text-gray-700">
        Catégorie <span className="text-red-500">*</span>
      </Label>
      <Controller
        name="categorie_id"
        control={control}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.id}>
                  {category.nom}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errors.categorie_id && <p className="text-red-500 text-sm mt-1">{errors.categorie_id.message}</p>}
    </div>

    <div>
      <Label htmlFor="collection_id" className="text-sm font-medium text-gray-700">
        Collection
      </Label>
      <Controller
        name="collection_id"
        control={control}
        render={({ field }) => (
          <Select value={field.value || ''} onValueChange={field.onChange}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Sélectionner une collection" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Aucune collection</SelectItem>
              {collections.map(collection => (
                <SelectItem key={collection.id} value={collection.id}>
                  {collection.nom}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errors.collection_id && <p className="text-red-500 text-sm mt-1">{errors.collection_id.message}</p>}
    </div>
  </div>

  {/* Genre */}
  <div>
    <Label htmlFor="genre" className="text-sm font-medium text-gray-700">
      Genre
    </Label>
    <Controller
      name="genre"
      control={control}
      render={({ field }) => (
        <Select value={field.value || ''} onValueChange={field.onChange}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Sélectionner un genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Non spécifié</SelectItem>
            <SelectItem value="homme">Homme</SelectItem>
            <SelectItem value="femme">Femme</SelectItem>
            <SelectItem value="enfant">Enfant</SelectItem>
            <SelectItem value="unisexe">Unisexe</SelectItem>
          </SelectContent>
        </Select>
      )}
    />
    {errors.genre && <p className="text-red-500 text-sm mt-1">{errors.genre.message}</p>}
  </div>

  {/* Prix et Quantité */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <Label htmlFor="prix" className="text-sm font-medium text-gray-700">
        Prix (€) <span className="text-red-500">*</span>
      </Label>
      <Input 
        id="prix" 
        type="number" 
        step="0.01" 
        min="0"
        {...register('prix')} 
        placeholder="0.00"
        className="mt-1"
      />
      {errors.prix && <p className="text-red-500 text-sm mt-1">{errors.prix.message}</p>}
    </div>

    <div>
      <Label htmlFor="quantite" className="text-sm font-medium text-gray-700">
        Quantité en stock
      </Label>
      <Input 
        id="quantite" 
        type="number" 
        min="0"
        {...register('quantite')} 
        placeholder="0"
        className="mt-1"
      />
      {errors.quantite && <p className="text-red-500 text-sm mt-1">{errors.quantite.message}</p>}
    </div>
  </div>

  {/* Section Promotion */}
  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
    <div className="flex items-center space-x-2">
      <Controller
        name="estEnPromotion"
        control={control}
        render={({ field }) => (
          <input
            type="checkbox"
            id="estEnPromotion"
            checked={field.value || false}
            onChange={(e) => field.onChange(e.target.checked)}
            className="rounded"
          />
        )}
      />
      <Label htmlFor="estEnPromotion" className="text-sm font-medium text-gray-700">
        Article en promotion
      </Label>
    </div>

    {watch('estEnPromotion') && (
      <div>
        <Label htmlFor="prixPromotion" className="text-sm font-medium text-gray-700">
          Prix promotionnel (€) <span className="text-red-500">*</span>
        </Label>
        <Input 
          id="prixPromotion" 
          type="number" 
          step="0.01" 
          min="0"
          {...register('prixPromotion')} 
          placeholder="0.00"
          className="mt-1"
        />
        {errors.prixPromotion && <p className="text-red-500 text-sm mt-1">{errors.prixPromotion.message}</p>}
      </div>
    )}
  </div>

  {/* Image */}
  <div>
    <Label htmlFor="image" className="text-sm font-medium text-gray-700">
      Image
    </Label>
    <Input 
      id="image" 
      type="file" 
      accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
      {...register('image')} 
      className="mt-1"
    />
    <p className="text-xs text-gray-500 mt-1">
      Formats acceptés: JPEG, PNG, GIF, WebP (max 10 Mo)
    </p>
    {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
  </div>

  {/* Informations supplémentaires */}
  <div>
    <Label htmlFor="infos" className="text-sm font-medium text-gray-700">
      Informations supplémentaires <span className="text-red-500">*</span>
    </Label>
    <Textarea 
      id="infos" 
      {...register('infos')} 
      placeholder='{"couleur": "rouge", "taille": "M", "matiere": "coton"}'
      rows={3}
      className="mt-1 font-mono text-sm"
    />
    <p className="text-xs text-gray-500 mt-1">
      Format JSON: {"{"}"propriété": "valeur", "autre": "valeur"{"}"}
    </p>
    {errors.infos && <p className="text-red-500 text-sm mt-1">{errors.infos.message}</p>}
  </div>

  {/* Boutons d'action */}
  <div className="flex justify-end space-x-3 pt-6 border-t">
    <Button 
      type="button" 
      variant="outline" 
      onClick={() => setIsDialogOpen(false)}
      disabled={isSubmitting}
    >
      Annuler
    </Button>
    <Button 
      type="submit" 
      className="bg-blue-600 hover:bg-blue-700" 
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Enregistrement...
        </>
      ) : (
        editingArticle ? 'Modifier l\'article' : 'Créer l\'article'
      )}
    </Button>
  </div>
</form>
            </DialogContent>
          </Dialog>

          <Dialog open={isVariantDialogOpen} onOpenChange={setIsVariantDialogOpen}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>
                  {editingVariant ? 'Modifier la variante' : 'Nouvelle variante'}
                  {selectedArticleForVariant && (
                    <span className="text-sm text-gray-500 block">
                      pour {selectedArticleForVariant.nom}
                    </span>
                  )}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmitVariant(handleSubmitVariant)} className="space-y-6 bg-white">
  {/* Couleur */}
  <div>
    <Label htmlFor="couleur" className="text-sm font-medium text-gray-700">
      Couleur <span className="text-red-500">*</span>
    </Label>
    <Input 
      id="couleur" 
      {...registerVariant('couleur')} 
      placeholder="Ex: Rouge, Bleu marine, Noir..."
      className="mt-1"
    />
    {variantErrors.couleur && <p className="text-red-500 text-sm mt-1">{variantErrors.couleur.message}</p>}
  </div>

  {/* Images */}
  <div>
    <Label htmlFor="images" className="text-sm font-medium text-gray-700">
      Images <span className="text-red-500">*</span>
    </Label>
    <div className="mt-1 space-y-2">
      <Input
        id="images"
        type="file"
        multiple
        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
        {...registerVariant('images')}
        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      <p className="text-xs text-gray-500">
        Sélectionnez plusieurs images pour cette variante. Formats acceptés: JPEG, PNG, GIF, WebP (max 10 Mo par image)
      </p>
    </div>
    {variantErrors.images && <p className="text-red-500 text-sm mt-1">{variantErrors.images.message}</p>}
  </div>

  {/* Section Tailles et Stock */}
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Tailles et stock</h3>
        <p className="text-sm text-gray-500">Ajoutez les différentes tailles disponibles pour cette variante</p>
      </div>
      <Button
        type="button"
        variant="outline"
        onClick={() => append({ taille: '', quantite: 0, prix: 0 })}
        className="flex items-center space-x-2"
      >
        <Plus size={16} />
        <span>Ajouter une taille</span>
      </Button>
    </div>

    {fields.length === 0 && (
      <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
        <div className="space-y-2">
          <p>Aucune taille ajoutée</p>
          <p className="text-sm">Cliquez sur Ajouter une taille pour commencer</p>
        </div>
      </div>
    )}

    <div className="space-y-3">
      {fields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <div>
            <Label htmlFor={`tailles.${index}.taille`} className="text-sm font-medium text-gray-700">
              Taille <span className="text-red-500">*</span>
            </Label>
            <Input 
              {...registerVariant(`tailles.${index}.taille`)} 
              placeholder="Ex: S, M, L, XL, 38, 40..."
              className="mt-1"
            />
            {variantErrors.tailles?.[index]?.taille && (
              <p className="text-red-500 text-sm mt-1">{variantErrors.tailles[index]?.taille?.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor={`tailles.${index}.quantite`} className="text-sm font-medium text-gray-700">
              Quantité <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              min="0"
              {...registerVariant(`tailles.${index}.quantite`, { valueAsNumber: true })}
              placeholder="0"
              className="mt-1"
            />
            {variantErrors.tailles?.[index]?.quantite && (
              <p className="text-red-500 text-sm mt-1">{variantErrors.tailles[index]?.quantite?.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor={`tailles.${index}.prix`} className="text-sm font-medium text-gray-700">
              Prix (€) <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              {...registerVariant(`tailles.${index}.prix`, { valueAsNumber: true })}
              placeholder="0.00"
              className="mt-1"
            />
            {variantErrors.tailles?.[index]?.prix && (
              <p className="text-red-500 text-sm mt-1">{variantErrors.tailles[index]?.prix?.message}</p>
            )}
          </div>

          <div className="flex items-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => remove(index)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 w-full md:w-auto"
              title="Supprimer cette taille"
            >
              <Trash2 size={16} className="mr-2 md:mr-0" />
              <span className="md:hidden">Supprimer</span>
            </Button>
          </div>
        </div>
      ))}
    </div>

    {fields.length > 0 && (
      <div className="text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
        <p className="font-medium text-blue-700">💡 Conseil</p>
        <p>Assurez-vous que chaque taille a un prix et une quantité en stock définis.</p>
      </div>
    )}
  </div>

  {/* Informations supplémentaires */}
  <div className="bg-gray-50 p-4 rounded-lg">
    <h4 className="text-sm font-medium text-gray-700 mb-2">Informations de la variante</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
      <div>
        <span className="text-gray-500">Nombre de tailles:</span>
        <span className="ml-2 font-medium">{fields.length}</span>
      </div>
      <div>
        <span className="text-gray-500">Stock total:</span>
        <span className="ml-2 font-medium">
          {fields.reduce((total, field, index) => {
            const quantite = watchVariant(`tailles.${index}.quantite`) || 0;
            return total + (typeof quantite === 'number' ? quantite : 0);
          }, 0)}
        </span>
      </div>
    </div>
  </div>

  {/* Boutons d'action */}
  <div className="flex justify-end space-x-3 pt-6 border-t">
    <Button 
      type="button" 
      variant="outline" 
      onClick={() => setIsVariantDialogOpen(false)}
      disabled={isSubmittingVariant}
    >
      Annuler
    </Button>
    <Button 
      type="submit" 
      className="bg-blue-600 hover:bg-blue-700" 
      disabled={isSubmittingVariant || fields.length === 0}
    >
      {isSubmittingVariant ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Enregistrement...
        </>
      ) : (
        editingVariant ? 'Modifier la variante' : 'Créer la variante'
      )}
    </Button>
  </div>
</form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Liste des Articles ({filteredArticles.length})</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Article</TableHead>
                <TableHead>Prix de base</TableHead>
                <TableHead>Stock total</TableHead>
                <TableHead>Variantes</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Collection</TableHead>
                <TableHead>Likes</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredArticles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      {article.image && (
                        <Image
                          src={article.image}
                          alt={article.nom}
                          className="w-12 h-12 object-cover rounded-lg"
                          height={48}
                          width={48}
                        />
                      )}
                      <div>
                        <div className="font-medium">{article.nom}</div>
                        <div className="text-sm text-gray-500">{article.reference}</div>
                        <div className="text-sm text-gray-500 max-w-xs truncate">
                          {article.description}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{article.prix}€</TableCell>
                  <TableCell>
                    <Badge variant={getTotalStock(article) > 10 ? 'default' : 'destructive'}>
                      {getTotalStock(article)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="flex items-center space-x-1">
                        <Palette size={12} />
                        <span>{getVariantCount(article)}</span>
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddVariant(article)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Plus size={14} />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>{getCategoryName(article.categorie_id)}</TableCell>
                  <TableCell>{getCollectionName(article.collection_id)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 text-red-600">
                      <Heart size={16} fill="currentColor" />
                      <span>{article.favoris?.length || 0}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditArticle(article)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteArticle(article.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Détail des variantes */}
      <div className="space-y-4">
        {filteredArticles.map((article) => (
          article.varietes.length > 0 && (
            <Card key={`varietes-${article.id}`}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package size={20} />
                  <span>Variantes de {article.nom}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {article.varietes.map((variant) => (
                    <div key={variant.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{variant.reference}</h4>
                        <Badge variant="outline" className="text-xs">
                          {variant.couleur}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Couleur:</span>
                          <span className="font-medium">{variant.couleur}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Stock total:</span>
                          <Badge variant={(variant.tailles?.reduce((total, t) => total + t.quantite, 0) || 0) > 10 ? 'default' : 'destructive'}>
                            {variant.tailles?.reduce((total, t) => total + t.quantite, 0) || 0}
                          </Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Images:</span>
                          <span className="font-medium">{variant.images?.length || 0}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h5 className="text-xs font-medium text-gray-700">Tailles:</h5>
                        <div className="flex flex-wrap gap-1">
                          {variant.tailles?.map((taille, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {taille.taille}: {taille.quantite} ({taille.prix}€)
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditVariant(article, variant)}
                          className="flex-1"
                        >
                          <Edit size={14} className="mr-1" />
                          Modifier
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteVariant(article.id, variant.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        ))}
      </div>
    </div>